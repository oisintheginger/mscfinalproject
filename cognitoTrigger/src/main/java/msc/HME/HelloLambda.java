package msc.HME;

import java.util.Map;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

public class HelloLambda {

    public Object handleRequest(Object requestObject, Context context) {
        LambdaLogger logger = context.getLogger();
        Map requestObjectMap = (Map) requestObject;
        Map requestInfoMap = (Map) requestObjectMap.get("request");
        Map userAttributesMap = (Map) requestInfoMap.get("userAttributes");
        Object userId = requestObjectMap.get("userName");
        Object email = userAttributesMap.get("email");
        logger.log(requestObjectMap.toString());
        logger.log(userId.toString());
        logger.log(email.toString());
        //WORKING SEND TO DB NEXT
        return requestObject;
    }
}

