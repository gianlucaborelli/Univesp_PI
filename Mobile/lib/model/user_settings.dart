class UserSettings {
  int themeMode = 0;

  UserSettings({required this.themeMode});

  UserSettings.fromJson(Map<String, dynamic> json) {
    themeMode = json['themeMode'];
  }
}
