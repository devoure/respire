from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Profile


class UserSerializers(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"},
                                      write_only=True)

    class Meta: 
        model = User
        fields = ('username', 'first_name', 'email', 'password', 'password2', 
                  'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def save(self): 
        user = User(email=self.validated_data['email'],
                    username=self.validated_data['username'],
                    first_name=self.validated_data['first_name'],
                    last_name=self.validated_data['last_name'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({
                'password': 'Password must watch.'
                })
        user.set_password(password)
        user.save()
        return user


class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserUpdateSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'date_joined')
