import 'dart:ffi';

class Product {
  String? id;
  String? name;
  String? description;
  int? stock;
  double? price;
  String? photoURL;

  Product({required this.id,
      required this.name,
      required this.description,
      required this.stock,
      required this.price});

  Product.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    description = json['description'];
    stock = json['stock'];
    price = json['price'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['description'] = description;
    data['stock'] = stock;
    data['price'] = price;
    return data;
  }
}
