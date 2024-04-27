import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/config.dart';
import 'package:sisgem_app/security/check_auth.dart';
import 'package:sisgem_app/theme/color_schemes.g.dart';

void main() async {
  await initConfigurations();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(useMaterial3: true, colorScheme: lightColorScheme),
      darkTheme: ThemeData(useMaterial3: true, colorScheme: darkColorScheme),
      title: 'SISGEM',
      home: const CheckAuth(),
    );
  }
}
