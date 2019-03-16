class User {
  constructor(userId, firstName, lastName, emailAddress,password, address1, address2, city, state, postalCode, country) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAddress = emailAddress;
      this.password = password;
      this.address1 = address1;
      this.address2 = address2;
      this.city = city;
      this.state = state;
      this.postalCode = postalCode;
      this.country = country;
  }
}
module.exports = User;
