import 'package:get/get.dart';
import 'package:sisgem_app/model/product_model.dart';
import 'package:sisgem_app/service/product_service.dart';

class ProductDetailController extends GetxController {
  final Rx<Product?> _product = Rxn<Product?>();
  var isLoading = false.obs;

  static ProductDetailController get to => Get.find();
  Product? get product => _product.value;

  loadUser(String id) async {
    isLoading.value = true;
    _product.value = await ProductService.to.getProductById(id);
    isLoading.value = false;
  }
}