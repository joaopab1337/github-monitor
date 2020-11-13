from rest_framework import serializers

from .models import Commit, Repository


class RepositorySerializer(serializers.ModelSerializer):
    amount = serializers.SerializerMethodField()

    def get_amount(self, obj):
        return obj.amount

    class Meta:
        model = Repository
        fields = ('name', 'amount')


class CommitSerializer(serializers.ModelSerializer):
    repository = serializers.StringRelatedField(many=False)

    class Meta:
        model = Commit
        fields = (
            'message',
            'sha',
            'author',
            'url',
            'avatar',
            'date',
            'repository',
        )
