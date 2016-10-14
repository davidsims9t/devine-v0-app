//
//  CameraRollConvert.m
//  Devine, Inc.
//
//  Created by David on 12/3/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "CameraRollConvert.h"
#import <UIKit/UIKit.h>

@implementation CameraRollConvert

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(read:(NSString *)uri width:(float)width height:(float)height callback:(RCTResponseSenderBlock)callback)
{
  NSURL *url = [[NSURL alloc] initWithString:uri];

  ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];

  [library assetForURL:url resultBlock:^(ALAsset *asset) {
    ALAssetRepresentation *rep = [asset defaultRepresentation];
    NSData *data;
    
    if ([[asset valueForProperty:ALAssetPropertyType] isEqualToString:ALAssetTypePhoto]) {
      CGImageRef iref = [rep fullResolutionImage];
      CGSize originalDimensions = [rep dimensions];
      
      CGSize scaledSize = CGSizeMake(width, height);
      
      if (iref) {
        UIImage *image = [UIImage imageWithCGImage:iref];
        
        if (CGSizeEqualToSize(originalDimensions, scaledSize) == NO) {
          CGFloat scale = 1;
          CGFloat originalWidth = originalDimensions.width;
          CGFloat originalHeight = originalDimensions.height;
          CGFloat scaledWidth = scaledSize.width;
          CGFloat scaledHeight = scaledSize.height;
          CGFloat widthScaleFactor = scaledWidth / originalWidth;
          CGFloat heightScaleFactor = scaledHeight / originalHeight;
          
          if (widthScaleFactor > heightScaleFactor) {
            scale = widthScaleFactor;
          } else {
            scale = heightScaleFactor;
          }
          
          scaledWidth = originalWidth * scale;
          scaledHeight = originalHeight * scale;
          
          UIGraphicsBeginImageContext(scaledSize);
          CGRect imageExtent = CGRectMake(0, 0, scaledWidth, scaledHeight);
          [image drawInRect:imageExtent];
          
          image = UIGraphicsGetImageFromCurrentImageContext();
          UIGraphicsEndImageContext();
          
          data = UIImageJPEGRepresentation(image, 0.8);
        }
      } else {
        callback(@[@false]);
      }
    } else if ([[asset valueForProperty:ALAssetPropertyType] isEqualToString:ALAssetTypeVideo]) {
      Byte *buffer = (Byte*)malloc(rep.size);
      NSUInteger buffered = [rep getBytes:buffer fromOffset:0.0 length:rep.size error:nil];
      
      data = [NSData dataWithBytesNoCopy:buffer length:buffered freeWhenDone:YES];
    } else {
      callback(@[@false]);
    }
    
    NSString *base64Encoded = [data base64EncodedStringWithOptions:0];
    
    callback(@[base64Encoded]);
  } failureBlock:^(NSError *error) {
    NSLog(@"Failed to base64 encode file %@", error);
  }];
}

@end