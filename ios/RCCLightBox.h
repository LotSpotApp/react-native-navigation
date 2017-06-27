#import <React/RCTBridge.h>
#import <UIKit/UIKit.h>

@interface RCCLightBox : NSObject
+(void)showWithParams:(NSDictionary*)params resolver:(RCTPromiseResolveBlock)resolve;
+(void)dismiss:(void (^)())resolve;
@end
