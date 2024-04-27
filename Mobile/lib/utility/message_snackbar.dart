import 'package:flutter/material.dart';
import 'package:get/get.dart';

class MessageSnackBar {
  late String message;
  late String? title;
  late Icon? icon;

  MessageSnackBar({required this.message, this.title});

  show() {
    return Get.showSnackbar(
      GetSnackBar(
        icon: const Icon(
          Icons.error_outline_outlined,
          color: Colors.white70,
        ),
        title: title,
        message: message,
        backgroundColor: Colors.black87,
        duration: const Duration(seconds: 3),
      ),
    );
  }
}
