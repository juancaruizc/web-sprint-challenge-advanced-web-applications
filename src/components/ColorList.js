import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../helpers/axiosWithAuth';
import EditMenu from './EditMenu';
import { useParams, useHistory } from 'react-router-dom';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then((res) => updateColors(res.data))
      .catch((err) => console.log(err));
  }, [updateColors]);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };
  console.log('colors', colors);
  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        const updatedColorList = colors.map((color) => {
          if (color.id === res.data.id) {
            return res.data;
          } else {
            return color;
          }
        });
        updateColors(updatedColorList);
        push('/bubbles');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(id);
  const deleteColor = (color) => {
    console.log('second id', color.id);
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        const deletedColorList = colors.filter(
          (color) => `${color.id}` != res.data
        );
        updateColors(deletedColorList);
        console.log('res', res.data);
        // push('/bubbles');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.length
          ? colors.map((color) => (
              <li key={color.color} onClick={() => editColor(color)}>
                <span>
                  <span
                    className='delete'
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteColor(color);
                    }}
                  >
                    x
                  </span>{' '}
                  {color.color}
                </span>
                <div
                  className='color-box'
                  style={{ backgroundColor: color.code.hex }}
                />
              </li>
            ))
          : ''}
      </ul>
      {editing && (
        <EditMenu
          colorToEdit={colorToEdit}
          saveEdit={saveEdit}
          setColorToEdit={setColorToEdit}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.
