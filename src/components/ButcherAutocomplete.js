// ButcherAutocomplete.js

import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const ButcherAutocomplete = ({ butcherTitles, onSelection }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [butcherNotFound, setButcherNotFound] = useState(false);

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    const suggestions = butcherTitles.filter(
      (title) => title.toLowerCase().indexOf(inputValueLowerCase) > -1
    );
    return suggestions;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(value);
    setSuggestions(suggestions);
    setButcherNotFound(suggestions.length === 0); // Set butcherNotFound flag
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
    setButcherNotFound(false); // Reset butcherNotFound flag when suggestions are cleared
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="suggestion-item">{suggestion}</div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion);
    onSelection(suggestion);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      // If there's a suggestion selected, update the input value
      if (suggestions.length > 0) {
        setValue(suggestions[0]); // Update input value with the first suggestion
        onSelection(suggestions[0]); // Call the selection handler with the selected suggestion
      }
    }
  };

  const inputProps = {
    placeholder: 'Enter Butcher Title',
    value,
    onChange: onChange,
    onKeyDown: onKeyDown, // Add keydown event listener
    className: 'butcher-autocomplete-input', // Add class name to the input
  };

  return (
    <div className="butcher-autocomplete-container"> {/* Add class name to the container */}
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
      {butcherNotFound && <p className="butcher-not-found">Butcher not found</p>} {/* Add class name to the warning message */}
    </div>
  );
};

export default ButcherAutocomplete;
