#import "RNMLYDriver.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
@import MLYSDK;

@implementation RNMLYDriver

RCT_EXPORT_MODULE(MLYDriver);

RCT_REMAP_METHOD(initialize, options: (NSDictionary*) options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSString* clientID = [RCTConvert NSString:options[@"clientID"]];
  NSString* server = [RCTConvert NSString:options[@"server"]];
  
  BOOL hasSampleRate = options[@"sampleRate"]!=nil;
  double sampleRate = 1.0;
  if(hasSampleRate){
    sampleRate = [RCTConvert double:options[@"sampleRate"]];
  }
  BOOL debug = [RCTConvert BOOL:options[@"debug"]];
  
    RCTLogInfo(@"initialize clientID:%@ server:%@ sampleRate:%f debug:%d", clientID, server, sampleRate, debug);
  
    NSDictionary *result = [[NSDictionary alloc]init];
    NSError *error = nil;
    [MLYDriver initializeAndReturnError: &error :^(MLYDriverOptions * options) {
      [[options client] setId:clientID];
      if( server != nil) {
        [[[options server] host] setFqdn:server];
      }
      [options setDebug: debug];
      if(hasSampleRate) {
        [options setMuxSampleRate:sampleRate];
      }
    }];
  
  if (error) {
    reject(@"MLYSDK initialize error", error.description, error);
  } else {
    resolve(result);
  }
}

@end
