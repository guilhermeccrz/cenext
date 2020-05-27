this.state = {
    fullName: {
      value: '',
      isValid: '',
    },
    email: {
      value: '',
      isValid: '',
    },
    department: {
      value: '',
      isValid: '',
    },
    phone: {
      value: '',
      isValid: '',
    },
    image: {
      isValid: 'valid',
    },
    form: {
      isValid: null,
    },
  };

onChange = (e) => {
  const value = e.target.value;
  const name = e.target.name;
  let isValid = '';

  if (name == 'fullName' || name == 'department' )  {
    isValid = value.match(/.{4,}/) ? 'valid' : 'invalid';
  }

  if (name == 'phone')  {
    isValid = value.match(/.{14,}/) ? 'valid' : 'invalid';
  }

  if (name == 'email')  {
    isValid = value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? 'valid' : 'invalid';
  }

  const currentState  = { [e.target.name]: {'value': e.target.value, 'isValid': isValid} };
  this.setState(currentState);
  this.validateForm({
    ...this.state,
    ...currentState
  });
};

validateForm = (fields) => {
  const { fullName, email, department, phone, image } = fields;

  if(fullName.isValid == 'valid' && email.isValid == 'valid' && department.isValid == 'valid' && phone.isValid == 'valid' && image.isValid == 'valid' ) {
    this.setState({form: { isValid: true}});
  } else {
    this.setState({form: { isValid: false}});
  }
    
}
