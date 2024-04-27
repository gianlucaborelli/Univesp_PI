import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/controllers/authenticantion_controller.dart';
import 'package:sisgem_app/pages/auth_pages/forgot_password/forgot_password_page.dart';
import 'package:sisgem_app/pages/auth_pages/signup/signup_page.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({
    super.key,
  });

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final GlobalKey<FormState> _formKey = GlobalKey();
  final FocusNode _focusNodePassword = FocusNode();
  final controller = Get.put(AuthenticationController());

  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          Text(
            "Bem vindo",
            style: Theme.of(context).textTheme.headlineLarge,
          ),
          const SizedBox(height: 10),
          Text(
            "Faça login em sua conta",
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 60),
          TextFormField(
            textInputAction: TextInputAction.next,
            controller: controller.email,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(
              labelText: "E-mail",
              prefixIcon: Icon(Icons.mail_outline),
              border: UnderlineInputBorder(),
              enabledBorder: UnderlineInputBorder(),
            ),
            onEditingComplete: () => _focusNodePassword.requestFocus(),
            validator: (String? value) {
              if (value == null || value.isEmpty) {
                return "Insira um E-mail.";
              }
              return null;
            },
          ),
          const SizedBox(height: 10),
          TextFormField(
            onEditingComplete: () => controller.login(),
            controller: controller.password,
            focusNode: _focusNodePassword,
            obscureText: _obscurePassword,
            keyboardType: TextInputType.visiblePassword,
            decoration: InputDecoration(
              labelText: "Senha",
              prefixIcon: const Icon(Icons.password_outlined),
              suffixIcon: IconButton(
                onPressed: () {
                  setState(() {
                    _obscurePassword = !_obscurePassword;
                  });
                },
                icon: _obscurePassword
                    ? const Icon(Icons.visibility_outlined)
                    : const Icon(Icons.visibility_off_outlined),
              ),
              border: const UnderlineInputBorder(),
              enabledBorder: const UnderlineInputBorder(),
            ),
            validator: (String? value) {
              if (value == null || value.isEmpty) {
                return "Insira uma senha.";
              }
              return null;
            },
          ),
          Container(
            height: 40,
            alignment: Alignment.centerRight,
            child: TextButton(
              child: const Text(
                "Recuperar senha.",
                textAlign: TextAlign.right,
              ),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const ForgotPasswordPage(),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 40),
          Column(
            children: [
              FilledButton(
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size.fromHeight(50),
                  ),
                  onPressed: () {
                    if (_formKey.currentState?.validate() ?? false) {
                      controller.login();
                    }
                  },
                  child: Obx(
                    () => controller.isLoading.value
                        ? const CircularProgressIndicator()
                        : const Text("Entrar"),
                  )),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Não tem uma conta?"),
                  TextButton(
                    onPressed: () {
                      _formKey.currentState?.reset();
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            return const SignupPage();
                          },
                        ),
                      );
                    },
                    child: const Text("Crie uma"),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
