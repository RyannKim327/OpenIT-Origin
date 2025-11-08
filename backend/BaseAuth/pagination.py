from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class TenRowPaginator(PageNumberPagination):
    page_size = 10


class BasePaginator(TenRowPaginator):
    page_size_query_params = "page_size"
    max_page_size = 100

    def get_paginated_response(self, data):
        page = self.page
        paginator = self.paginator

        count = page.count
        current_page = page.number
        page_size = paginator.per_page
        start_entry = (current_page - 1) * page_size + 1 if count != 0 else 0
        end_entry = min(current_page + page_size, count)

        return Response(
            {
                "count": count,
                "next": self.get_next_link(),
                "prev": self.get_previous_link(),
                "total_pages": paginator.num_pages,
                "response": {
                    "data": data,
                    "current_page": current_page,
                    "start_entry": start_entry,
                    "end_entry": end_entry,
                },
            }
        )
