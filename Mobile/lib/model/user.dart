class User {
  String userId;
  String name;
  String email;
  String role;
  String? photoURL;
  User(
      {required this.userId,
      required this.name,
      required this.email,
      required this.role});

  factory User.fromJson(Map<String, dynamic> responseData) {
    return User(
        userId: responseData['id'],
        name: responseData['Username'],
        email: responseData['Email'],
        role: responseData['Role']);
  }
}
