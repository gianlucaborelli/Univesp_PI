import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/controllers/authenticantion_controller.dart';
import 'package:sisgem_app/service/auth_service.dart';

class CustumerAppBar extends AppBar {
  CustumerAppBar({super.key})
      : super(
          centerTitle: true,
          title: const Text('SISGEM!'),
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(30),
            ),
          ),
          actions: [
            Padding(
              padding: const EdgeInsets.all(15.0),
              child: PopupMenuButton(
                child: const Icon(Icons.settings_outlined),
                itemBuilder: (context) => <PopupMenuEntry<PopupMenuItem>>[
                  PopupMenuItem(
                    onTap: () => logout(),
                    child: const Text('Logout'),
                  ),
                ],
              ),
            )
          ],
          bottom: PreferredSize(
              preferredSize: const Size.fromHeight(100.0),
              child: getAppBottomView()),
        );
}

logout() {
  final controller = Get.put(AuthenticationController());
  controller.logout();
}

Widget getAppBottomView() {
  return Container(
    padding: const EdgeInsets.only(left: 30, bottom: 20),
    child: Row(
      children: [
        getProfileView(),
        Container(
          margin: const EdgeInsets.only(left: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                AuthService.to.user!.name,
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                ),
              ),
              Text(
                AuthService.to.user!.email,
                style: const TextStyle(
                  fontSize: 13,
                ),
              )
            ],
          ),
        )
      ],
    ),
  );
}

Widget getProfileView() {
  return Stack(
    children: <Widget>[
      const CircleAvatar(
        radius: 32,
        child: Icon(Icons.person_outline_rounded),
      ),
      Positioned(
          bottom: -2,
          right: -4,
          child: Container(
            height: 30,
            width: 30,
            decoration: const BoxDecoration(
                color: Colors.greenAccent,
                borderRadius: BorderRadius.all(Radius.circular(20))),
            child: const Icon(
              Icons.edit_rounded,
              size: 20,
            ),
          ))
    ],
  );
}
