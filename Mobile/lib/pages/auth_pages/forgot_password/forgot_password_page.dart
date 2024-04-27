import 'package:flutter/material.dart';
import 'package:sisgem_app/pages/auth_pages/forgot_password/components/forgot_password_form.dart';
import 'package:sisgem_app/pages/auth_pages/forgot_password/components/forgot_password_top_image.dart';
import 'package:sisgem_app/utility/responsive.dart';

class ForgotPasswordPage extends StatelessWidget {
  const ForgotPasswordPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context, false),
        ),
      ),
      resizeToAvoidBottomInset: true,
      body: SizedBox(
        width: double.infinity,
        height: MediaQuery.of(context).size.height,
        child: const Stack(
          alignment: Alignment.center,
          children: <Widget>[
            SafeArea(
                child: SingleChildScrollView(
              child: Responsive(
                  mobile: MobileForgotPasswordScreen(),
                  desktop: Row(
                    children: [
                      Expanded(
                        child: ForgotPasswordTopImage(),
                      ),
                      Expanded(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SizedBox(
                              width: 350,
                              child: ForgotPasswordForm(),
                            ),
                          ],
                        ),
                      )
                    ],
                  )),
            )),
          ],
        ),
      ),
    );
  }
}

class MobileForgotPasswordScreen extends StatelessWidget {
  const MobileForgotPasswordScreen({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ForgotPasswordTopImage(),
        Row(
          children: [
            Spacer(),
            Expanded(
              flex: 8,
              child: ForgotPasswordForm(),
            ),
            Spacer(),
          ],
        ),
      ],
    );
  }
}
