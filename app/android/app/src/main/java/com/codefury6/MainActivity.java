package com.codefury6;

import android.os.Bundle;
import java.util.ArrayList;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import cap.phone.usage.PhoneEventUsage;

public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    registerPlugin(PhoneEventUsage.class);
    // this.init(
    // savedInstanceState,
    // new ArrayList<Class<? extends Plugin>>() {
    // {
    // // Additional plugins you've installed go here
    // // Ex: add(TotallyAwesomePlugin.class);
    // add(PhoneEventUsage.class);
    // }
    // });
  }
}
