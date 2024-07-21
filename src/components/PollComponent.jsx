/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import styled from '@emotion/native';

const PollContainer = styled.View`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const PollQuestion = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const PollOption = styled.TextInput`
  background-color: ${({ option }) => (option ? '#f1f1f1' : 'white')};
  padding: 12px;
  border-radius: 8px;
`;

const PollOptionWrapper = styled.View`
  border: ${({ option }) => (!option ? 'red 1px dashed' : 'none')};
  border-spacing: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  /* background-clip: padding-box; */
`;

const PollOptionText = styled.Text`
  font-size: 16px;
`;

function PollComponent({ question, options, setOptions }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleAddOption = (text, index) => {
    setOptions(() =>
      options.map((option, i) => {
        if (index === i) {
          return text;
        }
        return option;
      }),
    );
  };

  return (
    <PollContainer>
      <PollQuestion>{question}</PollQuestion>
      {options.map((option, index) => (
        <PollOptionWrapper key={index} option={option}>
          <PollOption
            onChangeText={(text) => handleAddOption(text, index)}
            index={index}
            option={option}
          >
            <PollOptionText index={index}>{option}</PollOptionText>
          </PollOption>
        </PollOptionWrapper>
      ))}
      {/* <PollOption>
        <PollInput
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder="Add an option..."
        />
      </PollOption> */}
    </PollContainer>
  );
}

export default PollComponent;
