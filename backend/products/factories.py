from products.models import Product, Category
from django.contrib.auth.models import User

import factory

text = """Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis magna fringilla nunc lobortis, sit amet efficitur enim tristique. 
Praesent sed molestie sem. Nullam a velit ultricies sem iaculis rhoncus id eget turpis. Nullam sed orci eu enim interdum pharetra sit amet ac nunc.
Sed tempus vehicula sapien id placerat. Aliquam tristique neque nec elit fermentum, eget consequat eros consequat. Sed aliquet posuere dignissim."""


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    name = factory.Faker('word')

class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    title = factory.Faker('word')
    price = factory.Faker('pydecimal', left_digits=3, right_digits=2, positive=True) 
    content = factory.Faker('sentence')
    category = factory.LazyFunction(lambda: Category.objects.get_or_create(name='Uncategorized')[0])

    
# Create your tests here.


# user = User.objects.first()
# category = ["RTV", "AGD", "GAMING", "HOUSE", "IDK", "ELECTRO", "KITCHEN"]

# for i in range(10):
#     test = random.choice(category)
#     Product.objects.create(
#         user=user,
#         title = f"Product {i}",
#         content=text,
#         price=99.99,
#         category=test
#     )
