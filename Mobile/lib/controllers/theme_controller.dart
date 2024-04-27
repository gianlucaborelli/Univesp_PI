import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/service/auth_service.dart';
import 'package:sisgem_app/service/user_settings/user_settings_service.dart';

enum ThemeModes { light, system, dark }

class ThemeController extends GetxController {
  // static String settingsType = "ThemeMode";
  // late AuthService authService = AuthService();
  // final Rx<ThemeModes> _themeSelected = Rx<ThemeModes>(ThemeModes.system);

  // Map<int, ThemeMode> themeModes = {
  //   2: ThemeMode.light,
  //   1: ThemeMode.dark,
  //   0: ThemeMode.system,
  // };

  // ThemeModes get themeSelected => _themeSelected.value;

  static ThemeController get to => Get.find();

  // loadThemeMode(int? theme) async {
  //   setMode(theme);
  // }

  // Future setMode(int? theme) async {
  //   _themeSelected.value = _getThemeEnum(theme);
  //   ThemeMode? themeMode = themeModes[theme];
  //   Get.changeThemeMode(themeMode ?? ThemeMode.system);
  // }

  // changeTheme(ThemeModes selectedTheme) {
  //   var theme = _getThemeValue(selectedTheme);
  //   UserSettingsService.to
  //       .updateSettings(settingsType, _getThemeValue(selectedTheme));
  //   setMode(theme);
  // }

  // int _getThemeValue(ThemeModes mode) {
  //   switch (mode) {
  //     case ThemeModes.system:
  //       return 0;
  //     case ThemeModes.dark:
  //       return 1;
  //     case ThemeModes.light:
  //       return 2;
  //     default:
  //       return -1;
  //   }
  // }

  // ThemeModes _getThemeEnum(int? mode) {
  //   switch (mode) {
  //     case 0:
  //       return ThemeModes.system;
  //     case 1:
  //       return ThemeModes.dark;
  //     case 2:
  //       return ThemeModes.light;
  //     default:
  //       return ThemeModes.system; // Tratamento para um caso padrão ou erro
  //   }
  // }
}
