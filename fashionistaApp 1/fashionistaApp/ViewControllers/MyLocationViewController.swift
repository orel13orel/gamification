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

class MyLocationViewController: UIViewController {

    @IBOutlet weak var mapView: MKMapView!
  
    let locationManager = CLLocationManager()
    override func viewDidLoad() {
        super.viewDidLoad()
        checklocationServices()
        
    }
    
    func setUpLocationManager() {
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
    }
    
    func centerViewonUserLocation() {
        if let location = locationManager.location?.coordinate {
           let span = MKCoordinateSpanMake(0.01, 0.01)
           let region = MKCoordinateRegion(center: location, span: span)
            mapView.setRegion(region, animated: true)
        }
    }

    func checklocationServices() {
        if CLLocationManager.locationServicesEnabled() {
            setUpLocationManager()
            checkLocationAuthorization()
        } else {
            
        }
    }
    
    func checkLocationAuthorization() {
        switch CLLocationManager.authorizationStatus() {
        case .authorizedWhenInUse:
            mapView.showsUserLocation = true
            centerViewonUserLocation()
            break
        case .denied:
            break
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
        case .restricted:
            break
        case .authorizedAlways:
            break
        }
    }
    
}

extension MyLocationViewController: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        
    }
    
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        
    }
}
