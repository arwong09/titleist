define(["react"], function(React) {

  var extend = function(target, source) {
    Object.keys(source).forEach(function(key) {
      target[key] = source[key];
    });
  };

  var options = {
    defaultText: '',
    defaultStopWords: ['a','an','and','as','at','but','by','for','from','in','into','nor','of','on','onto','or','the','to','vs','with','vs.'],
    stopWords: [],
    componentDidMount: function() {
      this.stopWords = this.stopWords.concat(this.defaultStopWords);
    },
    getInitialState: function() {
      return {value: this.defaultText, checked: true};
    },
    handleChange: function() {
      var text = this.refs.input.getDOMNode().value;

      if(this.state.checked === false) {
        return this.setState({value: text});
      }

      if(text[text.length - 1] === " ") {
        this.capitalizeLastWord(text);
      } else {
        this.setState({value: text});
      }
    },
    capitalizeLastWord: function(text) {
      var wordArray, lastWord, modifiedWord, newText;

      wordArray = text.split(" ")
      lastWord = wordArray[wordArray.length - 2];

      if(this.stopWords.indexOf(lastWord) === -1) {
        modifiedWord = this.capitalize(lastWord);
      }

      wordArray[wordArray.length - 2] = modifiedWord || lastWord;
      newText = wordArray.join(" ");
      this.setState({value: newText});
    },
    toggleChecked: function() {
      this.setState({checked: !this.state.checked});
      React.findDOMNode(this.refs.input).focus();
    },
    capitalize: function(string) {
      return string.replace(/^([a-z])|\s([a-z])/g, function(char) { return char.toUpperCase() });
    },
    render: function() {
      return (
        <div>
          <input type="text" name="title" id="titleist-input" onChange={this.handleChange} ref="input" value={this.state.value} />
          <label className="titleist-toggle-label">
            <i className={"fa fa-bolt toggled-" + this.state.checked} />
            <input type="checkbox" id="titleist-toggle" ref="checkbox" onChange={this.toggleChecked} checked={this.state.checked} />
          </label>
        </div>
      )
    }
  }

  var Titleist = {
    initialize: function(selector, customOptions) {
      extend(options, customOptions);
      var TitleistComponent = React.createClass(options);
      React.render(<TitleistComponent />, document.getElementById(selector));
    }
  }

  return Titleist;
});
