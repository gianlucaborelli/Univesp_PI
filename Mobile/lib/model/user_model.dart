class UserModel {
  String? id;
  String? name;
  String? email;
  String? obs;
  String? role;
  String? photoURL;

  UserModel({this.id, this.name, this.email, this.obs, this.role});

  UserModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    email = json['email'];
    obs = json['obs'];
    role = json['role'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['email'] = email;
    data['obs'] = obs;
    data['role'] = role;
    return data;
  }
}
