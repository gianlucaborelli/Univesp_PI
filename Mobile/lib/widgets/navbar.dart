import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/controllers/theme_controller.dart';
import 'package:sisgem_app/pages/users_page/users_page.dart';
import 'package:sisgem_app/service/auth_service.dart';

import '../controllers/authenticantion_controller.dart';

class NavBar extends StatefulWidget {
  const NavBar({super.key});

  @override
  State<NavBar> createState() => _NavBarState();
}

class _NavBarState extends State<NavBar> {
  final controller = Get.put(AuthenticationController());

  //final ThemeController themeController = ThemeController.to;

  @override
  Widget build(BuildContext context) {
    String? photoURL = AuthService.to.user?.photoURL;

    return Drawer(
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topRight: Radius.circular(30),
          bottomRight: Radius.circular(30),
        ),
      ),
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            accountName: Text(
              AuthService.to.user!.name,
            ),
            accountEmail: Text(
              AuthService.to.user!.email,
            ),
            currentAccountPicture: CircleAvatar(
              child: ClipOval(
                child: Container(
                  child: photoURL != null
                      ? Image.network(
                          photoURL,
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
            decoration: const BoxDecoration(
              image: DecorationImage(
                  image: AssetImage('assets/images/appbar_image3.jpg'),
                  fit: BoxFit.cover),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.people_alt_outlined),
            title: const Text('Usuários'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const UsersPage(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.category),
            title: const Text('Produtos'),
            onTap: () => {},
          ),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.exit_to_app_outlined),
            title: const Text('Sair'),
            onTap: () => controller.logout(),
          ),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.fromLTRB(16, 0, 0, 0),
                child: const Icon(Icons.lightbulb_circle_outlined),
              ),
              Container(
                padding: const EdgeInsets.fromLTRB(15, 0, 50, 0),
                child: const Text('Tema'),
              ),
              // SegmentedButton(
              //   showSelectedIcon: false,
              //   segments: const <ButtonSegment<ThemeModes>>[
              //     ButtonSegment(
              //       value: ThemeModes.light,
              //       icon: Icon(Icons.light_mode_outlined),
              //     ),
              //     ButtonSegment(
              //       value: ThemeModes.dark,
              //       icon: Icon(Icons.dark_mode_outlined),
              //     ),
              //     ButtonSegment(
              //       value: ThemeModes.system,
              //       icon: Icon(Icons.terminal_outlined),
              //     ),
              //   ],
              //   selected: {ThemeController.to.themeSelected},
              //   onSelectionChanged: (Set<ThemeModes> newSelection) {
              //     setState(
              //       () {
              //         //themeController.changeTheme(newSelection.first);
              //       },
              //     );
              //   },
              //   style: const ButtonStyle(
              //     tapTargetSize: MaterialTapTargetSize.shrinkWrap,
              //     visualDensity: VisualDensity(horizontal: -4, vertical: -4),
              //   ),
              // ),
            ],
          ),
        ],
      ),
    );
  }
}
