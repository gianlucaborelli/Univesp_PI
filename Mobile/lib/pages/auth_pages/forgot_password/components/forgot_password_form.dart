import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/controllers/authenticantion_controller.dart';
class ForgotPasswordForm extends StatefulWidget {
  const ForgotPasswordForm({super.key});

  @override
  State<ForgotPasswordForm> createState() => _ForgotPasswordFormState();
}

class _ForgotPasswordFormState extends State<ForgotPasswordForm> {
  final GlobalKey<FormState> _formKey = GlobalKey();
  final FocusNode _focusNodePassword = FocusNode();
  final controller = Get.put(AuthenticationController());

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          Text(
            "Esqueceu a senha?",
            style: Theme.of(context).textTheme.headlineLarge,
          ),
          const SizedBox(height: 10),
          Text(
            "Por favor, informe o E-mail associado a sua conta para enviarmos um link com as instruções de recuperação de senha.",
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 60),
          TextFormField(
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
          FilledButton(
            style: ElevatedButton.styleFrom(
              minimumSize: const Size.fromHeight(50),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
            ),
            onPressed: () {
              if (_formKey.currentState?.validate() ?? false) {
                controller.resetPassword();
              }
            },
            child: Obx(
              () => controller.isLoading.value
                  ? const CircularProgressIndicator()
                  : const Text("Enviar"),
            ),
          ),
        ],
      ),
    );
  }
}
