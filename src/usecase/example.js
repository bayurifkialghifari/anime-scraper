class ExampleUsecase {
  async example(param = null) {
    return param ? `Hello ${param}` : 'Hello guys';
  }
}

module.exports = new ExampleUsecase();
