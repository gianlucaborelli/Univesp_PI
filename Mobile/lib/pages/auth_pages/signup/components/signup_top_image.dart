import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:sisgem_app/utility/constants.dart';
import 'package:sisgem_app/utility/responsive.dart';

class SignupTopImage extends StatelessWidget {
  const SignupTopImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          children: [
            Responsive(
              mobile: Expanded(
                flex: 8,
                child: SvgPicture.asset(
                  "assets/icons/register.svg",
                  width: 180,
                ),
              ),
              desktop: Expanded(
                flex: 8,
                child: SvgPicture.asset(
                  "assets/icons/register.svg",
                  width: 230,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: defaultPadding * 2),
      ],
    );
  }
}
