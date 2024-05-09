import 'package:get/get.dart';
import 'package:sisgem_app/model/product_model.dart';
import 'package:sisgem_app/service/product_service.dart';

class ProductController extends GetxController {
  final Rx<ProductControllerState> _state = Rx(ProductControllerState.starting);
  List<Product> products = [];

  static ProductController get to => Get.find<ProductController>();

  ProductControllerState get state => _state.value;

  Future start() async {
    _state.value = ProductControllerState.loading;
    try {
      products = await ProductService.to.getAllProducts();
      _state.value = ProductControllerState.ready;
    } catch (ex) {
      _state.value = ProductControllerState.onError;
    }
  }
}

enum ProductControllerState { starting, loading, ready, onError }
