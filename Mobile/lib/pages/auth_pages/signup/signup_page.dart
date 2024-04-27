import 'package:flutter/material.dart';
import 'package:sisgem_app/pages/auth_pages/signup/components/signup_form.dart';
import 'package:sisgem_app/pages/auth_pages/signup/components/signup_top_image.dart';
import 'package:sisgem_app/utility/responsive.dart';

class SignupPage extends StatelessWidget {
  const SignupPage({super.key});

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
                  mobile: MobileSignupScreen(),
                  desktop: Row(
                    children: [
                      Expanded(
                        child: SignupTopImage(),
                      ),
                      Expanded(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SizedBox(
                              width: 350,
                              child: SignupForm(),
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

class MobileSignupScreen extends StatelessWidget {
  const MobileSignupScreen({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        SignupTopImage(),
        Row(
          children: [
            Spacer(),
            Expanded(
              flex: 8,
              child: SignupForm(),
            ),
            Spacer(),
          ],
        ),
      ],
    );
  }
}
