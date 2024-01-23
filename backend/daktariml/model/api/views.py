from rest_framework.response import Response
from rest_framework.decorators import api_view
from model.predict import predict
from model.models import Prediction
from django.contrib.auth.models import User
from .serializers import PredictionSerializers


@api_view(['POST'])
def get_predict(request):
    audio_file = request.data["audio"]
    res = predict(audio_file)
    if res != "Healthy":
        status = True
    request.data["prediction"] = res
    request.data["is_positive"] = status
    prediction = PredictionSerializers(data=request.data, partial=True)
    if prediction.is_valid():
        new_pred = prediction.save()
        res = PredictionSerializers(new_pred, many=False)
        return Response(res.data)
    return Response("ERROR")


@api_view((['GET']))
def get_predictions(request, pk):
    # user = User.objects.get(id=pk)
    predictions = Prediction.objects.all().filter(doctor=pk)
    res = PredictionSerializers(predictions, many=True)
    return Response(res.data)
