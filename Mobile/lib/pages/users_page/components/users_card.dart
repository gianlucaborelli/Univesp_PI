import 'package:flutter/material.dart';
import 'package:sisgem_app/model/user_model.dart';

class UsersCard extends StatelessWidget {
  final UserModel user;
  final VoidCallback? press;

  const UsersCard({super.key, required this.user, this.press});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ListTile(
          leading: CircleAvatar(
            child: ClipOval(
              child: Container(
                child: user.photoURL != null
                    ? Image.network(
                        user.photoURL!,
                        fit: BoxFit.cover,
                      )
                    : const FittedBox(
                        fit: BoxFit.fill,
                        child: Icon(
                          Icons.account_circle,
                          size: 100,
                        ),
                      ),
              ),
            ),
          ),
          title: Text(user.name ?? 'err'),
          subtitle: Text(user.email ?? 'err'),
          onTap: press,
        ),
        const Divider()
      ],
    );
  }
}
