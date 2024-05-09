import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:sisgem_app/model/product_model.dart';
import 'package:sisgem_app/utility/dio_interceptor/onerror_interceptor.dart';
import 'package:sisgem_app/utility/dio_interceptor/onrequest_interceptor.dart';
import 'package:sisgem_app/utility/message_snackbar.dart';
import 'package:sisgem_app/utility/webservice_url.dart';

class ProductService extends GetxController {
  static final String _baseUrl = WebServiceUrl.baseUrl;
  late final Dio _dio;

  ProductService(){
    _dio = Dio(BaseOptions(
      connectTimeout: const Duration(milliseconds: 5000),
    ));
    _dio.interceptors.add(OnRequestInterceptor());
    _dio.interceptors.add(OnErrorInterceptor());
  }

  static ProductService get to => Get.find<ProductService>();

  Future<List<Product>> getAllProducts() async {
    try {
      var response = await _dio.get('$_baseUrl/products');
      var list = response.data as List;
      return list.map((json) => Product.fromJson(json)).toList();
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    } catch (e) {
      MessageSnackBar(message: e.toString()).show();
    }
    return [];
  }

  Future<Product?> getProductById(String id) async {
    try {
      var url = "$_baseUrl/products/$id";
      var response = await _dio.get(url);
      Product user = Product.fromJson(response.data);
      return user;
    } on DioException catch (e) {
      MessageSnackBar(message: e.response!.data.toString()).show();
    } catch (e) {
      MessageSnackBar(message: e.toString()).show();
    }
    return null;
  }
}