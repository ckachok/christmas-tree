import ToysPage from 'pages/toys/toys';

class App {
  toysPage: ToysPage;

  constructor() {
    this.toysPage = new ToysPage(document.body, 'toys');
  }
}

export default App;
