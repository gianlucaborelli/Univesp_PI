import 'dart:convert';

import 'package:sisgem_app/model/user.dart';

class UserTokenHandler {
  User createUser(String response) {
    final decoded = json.decode(decodeBase64(response.split(".")[1]));

    return User(
        email: decoded[
            "sub"],
        name: decoded[
            "name"],
        role: decoded[
            "role"],
        userId: decoded[
            "id"]);
  }

  String decodeBase64(String toDecode) {
    String res;
    try {
      while (toDecode.length * 6 % 8 != 0) {
        toDecode += "=";
      }
      res = utf8.decode(base64.decode(toDecode));
    } catch (error) {
      throw Exception("decodeBase64([toDecode=$toDecode]) \n\t\terror: $error");
    }
    return res;
  }
}
