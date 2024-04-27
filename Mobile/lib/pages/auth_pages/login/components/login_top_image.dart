import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sisgem_app/utility/constants.dart';
import 'package:sisgem_app/utility/responsive.dart';

class LoginTopImage extends StatelessWidget {
  const LoginTopImage({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(height: defaultPadding * 1),
        Row(
          children: [
            Responsive(
              mobile: Expanded(
                flex: 8,
                child: SvgPicture.asset(
                  "assets/icons/login.svg",
                  width: 170,
                ),
              ),
              desktop: Expanded(
                flex: 8,
                child: SvgPicture.asset("assets/icons/login.svg", width: 230),
              ),
            ),
          ],
        ),
        const SizedBox(height: defaultPadding * 2),
      ],
    );
  }
}
