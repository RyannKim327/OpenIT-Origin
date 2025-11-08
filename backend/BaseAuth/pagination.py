from rest_framework.pagination import PageNumberPagination


class TenRowPaginator(PageNumberPagination):
    page_size = 10


class BaseAuthPaginator(TenRowPaginator):
    page_query_param = "page_size"
