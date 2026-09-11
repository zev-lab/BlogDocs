# Flutter 进阶：网络通信与本地持久化

现代移动应用几乎都需要与服务器进行数据交互，并在本地保存用户偏好设置或离线数据。本文将介绍在 Flutter 中如何处理网络请求和本地数据持久化。

## 1. 网络请求：Dio 与 Http

Flutter 官方提供了原生的 `http` 库，但在实际企业级项目中，通常会使用功能更强大的第三方库，比如 `dio`。

### 使用 http 包

`http` 包非常轻量，适合进行简单的请求。

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> fetchData() async {
  final url = Uri.parse('https://jsonplaceholder.typicode.com/posts/1');
  final response = await http.get(url);

  if (response.statusCode == 200) {
    final Map<String, dynamic> data = json.decode(response.body);
    print('Title: ${data['title']}');
  } else {
    throw Exception('Failed to load data');
  }
}
```

### 使用 Dio 包

`dio` 是一个强大的 Dart Http 请求库，支持拦截器、全局配置、表单数据、请求取消、文件下载等功能。

```dart
import 'package:dio/dio.dart';

class NetworkManager {
  late Dio _dio;

  NetworkManager() {
    _dio = Dio(BaseOptions(
      baseUrl: 'https://api.example.com',
      connectTimeout: const Duration(seconds: 5),
      receiveTimeout: const Duration(seconds: 3),
    ));

    // 添加拦截器
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        options.headers['Authorization'] = 'Bearer token123';
        return handler.next(options);
      },
      onResponse: (response, handler) {
        return handler.next(response);
      },
      onError: (DioException e, handler) {
        print('请求报错: ${e.message}');
        return handler.next(e);
      },
    ));
  }

  Future<void> getUserInfo() async {
    try {
      Response response = await _dio.get('/user/info');
      print(response.data);
    } catch (e) {
      print(e);
    }
  }
}
```

## 2. 本地持久化：SharedPreferences 与 SQLite

对于不同量级的数据，Flutter 提供了多种本地持久化方案。

### 轻量级键值存储：SharedPreferences

`shared_preferences` 适用于保存用户设置、登录状态等简单的键值对数据。

```dart
import 'package:shared_preferences/shared_preferences.dart';

class PrefsHelper {
  // 保存数据
  static Future<void> saveUsername(String name) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('username', name);
  }

  // 读取数据
  static Future<String?> getUsername() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('username');
  }

  // 删除数据
  static Future<void> removeUsername() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('username');
  }
}
```

### 关系型数据库：sqflite

对于复杂的结构化数据，推荐使用 `sqflite` 插件进行 SQLite 数据库操作。

```dart
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static Database? _database;

  static Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await initDB();
    return _database!;
  }

  static Future<Database> initDB() async {
    String path = join(await getDatabasesPath(), 'demo.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: (Database db, int version) async {
        await db.execute(
          'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)',
        );
      },
    );
  }

  // 插入数据
  static Future<void> insertUser(Map<String, dynamic> user) async {
    final db = await database;
    await db.insert('users', user, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  // 查询数据
  static Future<List<Map<String, dynamic>>> getUsers() async {
    final db = await database;
    return await db.query('users');
  }
}
```

## 总结

在实际项目中，我们通常将 Dio 结合 Json 序列化库进行网络请求和模型解析。针对持久化，可以将简单的配置项保存在 SharedPreferences 中，而将需要离线查询的大量数据存储到 SQLite 中。
