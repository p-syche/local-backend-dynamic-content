import React, { useState } from 'react';
import { contenTypes } from '../contentTypes';

export const DCText = ({ layoutElement, contentType, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedType, setSelectedType] = useState(
    layoutElement?.textTarget ? 'dynamic' : 'static'
  );

  const getTextFields = () => {
    const selectedType = contentType && contenTypes[contentType];
    if (!selectedType) return [];

    const contentTypeData = require('../contentTypes')[selectedType];
    return Object.entries(contentTypeData)
      .filter(([_, value]) => value === 'text')
      .map(([key]) => key);
  };

  const styles = {
    container: {
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      padding: '8px',
      margin: '4px',
      backgroundColor: '#ffffff',
      boxShadow: isEditing ? '0 0 0 2px #007FFF' : 'none',
      transition: 'all 0.2s ease'
    },
    select: {
      width: '100%',
      padding: '8px',
      border: '1px solid #007FFF',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#f8f9fa'
    },
    span: {
      cursor: 'pointer',
      padding: '4px 8px',
      display: 'inline-block',
      borderRadius: '4px',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#f0f0f0'
      }
    }
  };

  const handleSelect = (value) => {
    setSelectedType(value);
    if (onUpdate) {
      onUpdate({
        ...layoutElement,
        textTarget: value === 'static' ? null : value,
        text: value === 'static' ? layoutElement.text : null
      });
    }
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          alignContent: layoutElement.displayProps?.alignContent,
          alignItems: layoutElement.displayProps?.alignItems,
          justifyContent: layoutElement.displayProps?.justifyContent,
        }}
      >
        {isEditing ? (
          <select 
            style={styles.select}
            value={selectedType}
            onChange={(e) => handleSelect(e.target.value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
          >
            <option value="static">Static Text</option>
            {getTextFields().map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        ) : (
          <span 
            style={styles.span}
            variant={layoutElement?.displayProps?.variant}
            onClick={() => setIsEditing(true)}
          >
            {layoutElement?.textTarget ? '📝 ' + layoutElement?.textTarget : '📌 ' + layoutElement?.text}
          </span>
        )}
      </div>
    </div>
  );
};