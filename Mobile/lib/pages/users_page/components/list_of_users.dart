import 'package:flutter/material.dart';
import 'package:sisgem_app/controllers/user_detail_controller.dart';
import 'package:sisgem_app/controllers/users_controller.dart';
import 'package:sisgem_app/pages/users_page/components/users_card.dart';
import 'package:sisgem_app/pages/users_page/users_details/users_detail_page.dart';
import 'package:sisgem_app/utility/responsive.dart';

class ListOfUsers extends StatefulWidget {
  const ListOfUsers({super.key});

  @override
  State<ListOfUsers> createState() => _ListOfUsersState();
}

class _ListOfUsersState extends State<ListOfUsers> {
  _ListOfUsersState();

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () => UsersController.to.start(),
      child: ListView.builder(
        itemCount: UsersController.to.users.length,
        itemBuilder: (context, index) => UsersCard(
          user: UsersController.to.users[index],
          press: () {
            Responsive.isMobile(context)
                ? Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => UserDetailPage(
                          user: UsersController.to.users[index].id),
                    ),
                  )
                : UserDetailController.to
                    .loadUser(UsersController.to.users[index].id!);
          },
        ),
      ),
    );
  }
}
