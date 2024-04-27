class UserModel {
  String? id;
  String? name;
  String? email;
  int? gender;
  String? photoURL;

  UserModel({this.id, this.name, this.email, this.gender});

  UserModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    email = json['email'];
    gender = json['gender'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['email'] = email;
    data['gender'] = gender;
    return data;
  }
}
