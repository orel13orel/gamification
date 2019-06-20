//
//  MyLocationViewController.swift
//  fashionistaApp
//
//  Created by admin on 03/02/2019.
//  Copyright © 2019 Studio. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation
import GoogleMaps


class MyLocationViewController: UIViewController , CLLocationManagerDelegate {

    @IBOutlet weak var mapView: MKMapView!
    
    var locationManager = CLLocationManager()
  
    override func viewDidLoad() {
        super.viewDidLoad()
     //   checklocationServices()
        
        self.locationManager.requestWhenInUseAuthorization()
        
        if CLLocationManager.locationServicesEnabled(){
            locationManager.delegate = self
            locationManager.desiredAccuracy = kCLLocationAccuracyNearestTenMeters
            locationManager.startUpdatingLocation()
        }
        
    }
    
    override func loadView() {
//        let lat : Double
//        let long : Double
        
        
        
        let camera = GMSCameraPosition.camera(withLatitude: 37.785834, longitude: -122.406417, zoom: 10.0)
        let mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
        view = mapView
        let marker = GMSMarker()
        marker.position = CLLocationCoordinate2D(latitude: 31.97, longitude: 34.77)
        
        marker.map = mapView
        
    }
    func locationManager (_ manager: CLLocationManager , didUpdateLocations location :[CLLocation]){
        let localValue: CLLocationCoordinate2D = manager.location!.coordinate
        print("locations \(localValue.latitude) \(localValue.longitude)")
    }
//
//    func setUpLocationManager() {
//        locationManager.delegate = self
//        locationManager.desiredAccuracy = kCLLocationAccuracyBest
//    }
//
//    func centerViewonUserLocation() {
//        if let location = locationManager.location?.coordinate {
//           let span = MKCoordinateSpanMake(0.01, 0.01)
//           let region = MKCoordinateRegion(center: location, span: span)
//            mapView.setRegion(region, animated: true)
//        }
//    }
//
//    func checklocationServices() {
//        if CLLocationManager.locationServicesEnabled() {
//            setUpLocationManager()
//            checkLocationAuthorization()
//        } else {
//
//        }
//    }
//
//    func checkLocationAuthorization() {
//        switch CLLocationManager.authorizationStatus() {
//        case .authorizedWhenInUse:
//            mapView.showsUserLocation = true
//            centerViewonUserLocation()
//            break
//        case .denied:
//            break
//        case .notDetermined:
//            locationManager.requestWhenInUseAuthorization()
//        case .restricted:
//            break
//        case .authorizedAlways:
//            break
//        }
//    }
//
//}
//
//extension MyLocationViewController: CLLocationManagerDelegate {
//    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
//
//    }
//
//    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
//
//    }
}
