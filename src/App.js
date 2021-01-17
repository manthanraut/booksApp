import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import Rating from './rating';
class App extends Component {
  state = {
    books: [],
    newBookData: {
      title: '',
      rating: ''
    },
    colorname:'white',
    editBookData: {
      id: '',
      title: '',
      rating: ''
    },
    newBookModal: false,
    editBookModal: false
  }
  componentWillMount() {
    this._refreshBooks();
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: ! this.state.newBookModal
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: ! this.state.editBookModal
    });
  }
  addBook() {
    axios.post('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json', this.state.newBookData).then((response) => {
      let { books } = this.state;

      books.push(response.data);

      this.setState({ books, newBookModal: false, newBookData: {
        title: '',
        rating: ''
      }});
    });
  }
  updateBook() {
    let { title, rating } = this.state.editBookData;

    axios.put('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json' + this.state.editBookData.id, {
      title, rating
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { id: '', title: '', rating: '' }
      })
    });
  }
click=(e)=>{
  
  document.getElementById(e.bookID).style.backgroundColor="yellow";
}
  _refreshBooks() {
    axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.bookID} id={book.bookID}>
          <td style={{fontFamily: "Times New Roman, Times, serif",fontSize:18,padding:5}}>{book.bookID}</td>
          <td style={{fontFamily: "Times New Roman, Times, serif",fontSize:18,padidng:5}}>{book.title}</td>
          <td style={{fontFamily: "Times New Roman, Times, serif",fontSize:18,width:"auto",padding:5}}>{book.authors}</td>
          <td style={{padding:5,color:'#FF9529'}}>{book.average_rating}<Rating rating={book.average_rating} /></td>
          <td style={{padding:5,fontFamily: "Times New Roman, Times, serif",fontSize:18}}>{book.price}</td>
          <td><button className="btn btn-primary" onClick={()=>{this.click(book)}} >Add to Cart</button></td>
        </tr>
      )
    });
    return (
      <div className="App container table">

      <h1 style={{fontFamily: "Times New Roman, Times, serif"}} align="center">Books App</h1>
        <Table id="bookstable" className="table">
          <thead>
            <tr>
              <th>Book Sr. No.</th>
              <th>Title</th>
              <th>Authors</th>
              <th>Rating</th>
              <th>Price (<span>&#8377;</span>)</th>
              <th>Add to Cart list</th>
            </tr>
          </thead>

          <tbody>
            {books}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
