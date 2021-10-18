import React from 'react';

class DogImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: '',
      array: [],
    };
    this.fetchDog = this.fetchDog.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    if (localStorage.nameDogURL) {
      const parseStorage = JSON.parse(localStorage.nameDogURL);
      const lastDog = parseStorage[parseStorage.length - 1].message;
      this.setState({
        array: parseStorage,
        image: { message: lastDog },
      });
    } else {
      this.fetchDog();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.image.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { image } = this.state;
    if (prevState.image !== image) {
      const dogBreed = image.message.split('/')[4];
      alert(dogBreed);
    }
  }

  fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((result) => this.setState({ image: result }));
  }

  saveData() {
    const {
      image: { message },
      name,
      array,
    } = this.state;
    const dogData = { message, name };
    const newArray = [...array, dogData];
    this.setState({ array: newArray });
    this.setState({ name: '' });
    localStorage.setItem('namedDogURL', JSON.stringify(newArray));
  }

  render() {
    const { image, name } = this.state;
    if (image === '') return <p>Loading...</p>;
    return (
      <div>
        <p>Dogs</p>
        <button type="button" onClick={ this.fetchDog }>Next Dog</button>
        <div>
          <input
            type="text"
            value={ name }
            onChange={ (e) => this.setState({ name: e.target.value }) }
            placeholder="digite o nome do doguinho"
          />
          <button type="button" onClick={ this.saveData }>Salvar doguinho!</button>
        </div>
        <div>
          <img src={ image.message } alt="Randon Dog" />
        </div>
      </div>
    );
  }
}

export default DogImage;
