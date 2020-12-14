package centralhub.xyz.services;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

public class FileReaderService {

    private FileReaderService() {
    }

    private static Logger logger = Logger.getLogger(FileReaderService.class.getName());

    public static Map<String, String> getValueFromFileById(String idToFind, String fileName) throws Exception {
        try (Scanner scanner = new Scanner(new FileInputStream(fileName))) {

            while (scanner.hasNextLine()) {
                String[] splStrings = scanner.nextLine().split(":");
                if (splStrings[0].equals(idToFind)) {
                    Map<String, String> map = new HashMap<String, String>();
                    map.put(splStrings[0], splStrings[1]);
                    return map;
                }
            }

            return null;
        } catch (FileNotFoundException e) {
            FileReaderService.logger.log(Level.SEVERE, e.toString());
            throw new FileNotFoundException();
        }
    }

}
