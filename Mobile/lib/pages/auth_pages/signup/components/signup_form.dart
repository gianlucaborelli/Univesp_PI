import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/controllers/authenticantion_controller.dart';

class SignupForm extends StatefulWidget {
  const SignupForm({super.key});

  @override
  State<SignupForm> createState() => _SignupFormState();
}

class _SignupFormState extends State<SignupForm> {
  final GlobalKey<FormState> _formKey = GlobalKey();

  final FocusNode _focusNodeEmail = FocusNode();
  final FocusNode _focusNodePassword = FocusNode();
  final FocusNode _focusNodeConfirmPassword = FocusNode();

  final controller = Get.put(AuthenticationController());

  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          Text(
            "Registre-se",
            style: Theme.of(context).textTheme.headlineLarge,
          ),
          const SizedBox(height: 10),
          Text(
            "Crie sua conta",
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 35),
          TextFormField(
            controller: controller.name,
            keyboardType: TextInputType.name,
            decoration: const InputDecoration(
              labelText: "Nome",
              prefixIcon: Icon(Icons.person_outline),
              border: UnderlineInputBorder(),
              enabledBorder: UnderlineInputBorder(),
            ),
            validator: (String? value) {
              if (value == null || value.isEmpty) {
                return "Digite seu nome.";
              }
              return null;
            },
            onEditingComplete: () => _focusNodeEmail.requestFocus(),
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: controller.email,
            focusNode: _focusNodeEmail,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(
              labelText: "Email",
              prefixIcon: Icon(Icons.email_outlined),
              border: UnderlineInputBorder(),
              enabledBorder: UnderlineInputBorder(),
            ),
            validator: (String? value) {
              if (value == null || value.isEmpty) {
                return "Digite seu email.";
              }
              return null;
            },
            onEditingComplete: () => _focusNodePassword.requestFocus(),
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: controller.password,
            obscureText: _obscurePassword,
            focusNode: _focusNodePassword,
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
                      : const Icon(Icons.visibility_off_outlined)),
              border: const UnderlineInputBorder(),
              enabledBorder: const UnderlineInputBorder(),
            ),
            validator: (String? value) {
              if (value == null || value.isEmpty) {
                return "Digite sua senha.";
              } else if (value.length < 6) {
                return "Senha deve ter ao menos 6 caracteres.";
              }
              return null;
            },
            onEditingComplete: () => _focusNodeConfirmPassword.requestFocus(),
          ),
          const SizedBox(height: 10),
          TextFormField(
            controller: controller.confirmPassword,
            obscureText: _obscurePassword,
            focusNode: _focusNodeConfirmPassword,
            keyboardType: TextInputType.visiblePassword,
            decoration: InputDecoration(
              labelText: "Confirme sua senha",
              prefixIcon: const Icon(Icons.password_outlined),
              suffixIcon: IconButton(
                  onPressed: () {
                    setState(() {
                      _obscurePassword = !_obscurePassword;
                    });
                  },
                  icon: _obscurePassword
                      ? const Icon(Icons.visibility_outlined)
                      : const Icon(Icons.visibility_off_outlined)),
              border: const UnderlineInputBorder(),
              enabledBorder: const UnderlineInputBorder(),
            ),
            validator: (String? value) {
              if (value == null || value.isEmpty) {
                return "Digite sua senha.";
              } else if (value != controller.password.text) {
                return "Senhas não combinam.";
              }
              return null;
            },
          ),
          const SizedBox(height: 50),
          Column(
            children: [
              FilledButton(
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                onPressed: () {
                  if (_formKey.currentState?.validate() ?? false) {
                    controller.register();
                  }
                },
                child: Obx(
                  () => controller.isLoading.value
                      ? const CircularProgressIndicator()
                      : const Text("Registrar-se"),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
