package centralhub.xyz.utils;

import java.util.Date;
import java.util.Calendar;

public class DateHelpers {

    private DateHelpers() {
    }

    public static Date addHoursToJavaUtilDate(Date date, int hours) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.HOUR_OF_DAY, hours);
        return calendar.getTime();
    }
}
