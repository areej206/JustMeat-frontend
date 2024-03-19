import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const SpecificItemAutocomplete = ({ selectedButcherTitle, products, onItemSelection }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [itemNotFound, setItemNotFound] = useState(false);

  // Filter products based on the selected butcher title
  const filteredProducts = selectedButcherTitle
    ? products.filter(product => product.butcherTitle === selectedButcherTitle)
    : [];

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    const suggestions = filteredProducts.filter(
      (product) => product.item.toLowerCase().indexOf(inputValueLowerCase) > -1
    );
    return suggestions;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(value);
    setSuggestions(suggestions);
    setItemNotFound(suggestions.length === 0); // Set itemNotFound flag
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
    setItemNotFound(false); // Reset itemNotFound flag when suggestions are cleared
  };

  const getSuggestionValue = (suggestion) => suggestion.item;

  const renderSuggestion = (suggestion) => <div>{suggestion.item}</div>;

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion.item);
    onItemSelection(suggestion.item);
  };

  const inputProps = {
    placeholder: 'Enter Specific Item',
    value,
    onChange: onChange,
  };

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
      {itemNotFound && <p>Item not found</p>} {/* Conditional rendering for warning message */}
    </div>
  );
};

export default SpecificItemAutocomplete;
