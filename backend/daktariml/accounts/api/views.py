from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializers
from .serializers import ProfileSerializers
from .serializers import UserUpdateSerializers

from accounts.models import Profile
from django.contrib.auth.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view((['POST']))
def add_user(request):
    new_user = UserSerializers(data=request.data, partial=True)
    if new_user.is_valid():
        new_user.save()
        created_user = User.objects.get(username=request.data["username"])
        profile = Profile(user=created_user,
                          hospital="Aga Khan Hospital",
                          photo=request.data["photo"])
        profile.save()
        print("Profile creted")
        return Response("OK")
    return Response("ERROR")


@api_view(['GET'])
def get_profiles(request):
    profiles = Profile.objects.all()
    result = ProfileSerializers(profiles, many=True)
    return Response(result.data)


@api_view(['GET'])
def get_profile(request, pk):
    user = User.objects.get(id=pk)
    profile = Profile.objects.get(user=user)
    result = ProfileSerializers(profile, many=False)
    return Response(result.data)


@api_view(['GET'])
def get_user(request, pk):
    user = User.objects.get(id=pk)
    result = UserUpdateSerializers(user, many=False)
    return Response(result.data)

